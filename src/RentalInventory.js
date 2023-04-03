// Canon 5D
import canon5d1 from './../public/img/inventory/canon-5d-1.jpg'
import canon5d2 from './../public/img/inventory/canon-5d-2.jpg'
import canon5d3 from './../public/img/inventory/canon-5d-3.jpg'
// Canon 7D
import canon7d1 from './../public/img/inventory/canon-7d-1.jpg'
import canon7d2 from './../public/img/inventory/canon-7d-2.jpg'
import canon7d3 from './../public/img/inventory/canon-7d-3.jpg'
// Nikon D850
import nikonD8501 from './../public/img/inventory/nikon-D850-1.jpg'
import nikonD8502 from './../public/img/inventory/nikon-D850-2.jpg'
import nikonD8503 from './../public/img/inventory/nikon-D850-3.jpg'
// Red Dragon Cinema Camera
import redDragon1 from './../public/img/inventory/red-dragon-1.jpg'
import redDragon2 from './../public/img/inventory/red-dragon-2.jpg'
import redDragon3 from './../public/img/inventory/red-dragon-3.jpg'

const rentalEquipment = [
  {
    id: "CANON-5D",
    brand: "Canon",
    model: "5D DSLR",
    photos: [
      canon5d1,
      canon5d2,
      canon5d3,
    ],
    description: `4K Motion JPEG video (DCI cinema-type 4096 x 2160) at 30p or 24p; in-camera still frame grab* of 4K 8.8-Megapixel images; multiple video options include Full HD up to 60p, and HD up to 120p.` ,
    baseRate: 200,
  },
  {
    id: "CANON-7D",
    brand: "Canon",
    model: "7D DSLR",
    photos: [
      canon7d1,
      canon7d2,
      canon7d3,
    ],
    description: `Canon EOS 7D can capture true HD 1080p video at 30 frames per second.`,
    baseRate: 100,
  },
  {
    id: "NIKON-D850",
    brand: "Nikon",
    model: "D850",
    photos: [
      nikonD8501,
      nikonD8502,
      nikonD8503,
    ],
    description: `Higher resolution. Faster speed. Greater versatility.
    The D850 puts staggering image quality and impressive performance within reach of working photographers everywhere.`,
    baseRate: 300,
  },
  {
    id: "RED-DRAGON-CINEMA",
    brand: "RED",
    model: "Dragon Cinema",
    photos: [
      redDragon1,
      redDragon2,
      redDragon3,
    ],
    description: `This RED DSMC2 DRAGON-X Camera Kit is part of the RED unified DSMC2 lineup and includes the RED DRAGON-X BRAIN, as well the minimum gear you need to make a functional shooting package.`,
    baseRate: 500,
  }
]

export default rentalEquipment;