export default defineNuxtPlugin(() => {
  const google = process.client ? (window as any).google : {}

  const googleAuto = (input: any) => {
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-33.8902, 151.1759),
      new google.maps.LatLng(-33.8474, 151.2631)
    )
    const options = {
      bounds: defaultBounds,
      types: []
    }
    const autocomplete = new google.maps.places.Autocomplete(
      input, options
    )

    return autocomplete
  }
  return {
    provide: {
      googleAutoComplete: googleAuto
    }
  }
})
