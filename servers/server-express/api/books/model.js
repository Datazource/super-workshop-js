const mongoose = require('mongoose')
const Schema = mongoose.Schema

// const searchPlugin = require('mongoose-search-plugin')
// const textSearch = require('mongoose-text-search')

// Paginate list of all data
const mongoosePaginate = require('mongoose-paginate')

mongoosePaginate.paginate.options = {
  // lean: true,
  // leanWithId: false,
  page: 1,
  limit: 10,
  sort: { updatedAt: -1 }
}

const BookSchema = new Schema({
  isbn: {
    type: String,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  owners: [
    {
      type: Number,
      foreignField: 'accountId',
      ref: 'Account'
    }
  ],
  url: {
    type: String
  },
  createdBy: [
    {
      type: Number,
      foreignField: 'accountId',
      ref: 'Account'
    }
  ],
  updatedBy: [
    {
      type: Number,
      foreignField: 'accountId',
      ref: 'Account'
    }
  ]
}, {
  timestamps: true
})

// BookSchema.virtual('lenders', {
//   ref: 'Account',
//   localField: 'accountId', // Find account where `localField`
//   foreignField: 'isbn'    // is equal to `foreignField`
// })

BookSchema.plugin(mongoosePaginate)

// -----------------------------------------------------------------------------
// POPULATE

// BookSchema.pre('find', function (next) {
//   this.populate('owners', 'name')
//   next()
// })

// BookSchema.pre('findOne', function (next) {
//   this.populate('owners', 'name')
//   next()
// })
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// FULL TEXT SEARCH

// Give our schema text search capabilities
// BookSchema.plugin(searchPlugin, {
//   fields: ['isbn', 'name', 'price']
// })

// Give our schema text search capabilities
// BookSchema.plugin(textSearch)

// Add a text index
// BookSchema.index({ name: 'text' })
// -----------------------------------------------------------------------------

module.exports = mongoose.model('Book', BookSchema)
