import { NuxtAuthHandler } from '#auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

const { public: publicKeys, authSecret } = useRuntimeConfig()
const { apiBaseUrl } = publicKeys

declare module "next-auth" {
	interface User {
		accessToken: string,
		expiresIn: number,
	}

	interface Session {
		token: {
			[key: string]: any;
			accessToken: string;
			expiresIn: number;
			// JWT: any;
		}
	}
}

export default NuxtAuthHandler({
	pages: {
		signIn: '/auth/signin',
		error: '/auth/signin',
		signOut: '/auth/signin'
	},
	secret: authSecret,
	providers: [
		// @ts-expect-error
		CredentialsProvider.default({
			id: 'credentials',
			name: 'credentials',
			async authorize(credentials: any, req: any) {
				try {

					const { email, password } = credentials;

					const res = await fetch(`${apiBaseUrl}/auth/login`, {
						method: 'POST',
						body: JSON.stringify({ email, password }),
						headers: { "Content-Type": "application/json" }
					})

					const response = await res.json()
					
					// console.log('Response: ', response)
					if (response.statusCode === 401) {
						const messageError = response.message === 'Unauthorized' ? 'Email ou mot de passe incorrect' : response.message
						throw new Error(messageError)
					}

					if (response.error) {
						throw new Error(response.message)
					}

					if (response.accessToken) {
						return response
					}

					return null
				} catch (error: any ) {
					// console.log(error)
					if (error?.cause?.code === 'ECONNREFUSED') {
						const message = `
						<div class="text-sm space-y-2">
							<h1 class=" font-semibold text-base">Erreur interne du serveur</h1>
							<p>
								Désolé, une erreur interne du serveur s'est produite. Nos techniciens ont été informés de ce problème et travaillent à le résoudre. Veuillez réessayer ultérieurement.
							</p>
							<p>
								Si le problème persiste, veuillez contacter notre équipe d'assistance technique pour obtenir de l'aide.
							</p>
						</div>`

						throw createError({ statusCode: 503, message })
					} else {
						throw error
					}
				}
			} 
		})
	],
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24 * 300,
	},
	jwt: {
		// The maximum age of the NextAuth.js issued JWT in seconds.
		// Defaults to `session.maxAge`.
		maxAge: 60 * 60 * 24 * 300,
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				token.accessToken = user.accessToken
				token.expiresIn = user.expiresIn
			}
			return token
		},

		async session({ session, user, token }) {
			// const mySession = useCookie('alao')
			// console.log({ mySession })
			if (token) session.token = token as any
			return session
		}, 
	},
})