export default class Item {
  id!: number
  fileName: string
  title: string
  description: string
  price: number
  availability: number
  categoryId!: number

  constructor() {
    this.fileName = ''
    this.title = ''
    this.description = ''
    this.price = 0
    this.availability = 0
  }
}
