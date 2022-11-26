import db from "./index"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  for (let i = 1; i < 25; i++) {
    let date = i < 10 ? "0" + i : i

    await db.day.create({
      data: {
        date: `2022-12-${date}T06:17:41.000Z`,
        roaster: "Tomorrow Roasters",
        location: "Denver, Badsreg",
        coffee: `${i} Forma Leon, Groun Ald`,
        tastingNotes: "Wet berry, Wet coffee",
        varieties: "David Leone, SL69, SL429",
        roasterLink: "https://twom.com",
      },
    })
  }
}

export default seed
