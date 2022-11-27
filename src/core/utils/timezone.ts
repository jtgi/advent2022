export async function fetchTimezone(ip: string) {
  return fetch(`https://geoip-pi.vercel.app/api/${ip}`)
    .then((res) => res.json())
    .then((data) => {
      return data.timezone
    })
    .catch((err) => {
      return undefined
    })
}
