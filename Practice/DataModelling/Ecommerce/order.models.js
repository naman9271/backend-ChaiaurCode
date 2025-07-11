import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderPrice: {
      type: Number,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderItems: [
      {
        type: [orderItemSchema],

        //or
        // type: [
        //   {
        //     productId: {
        //       type: mongoose.Schema.Types.ObjectId,
        //       ref: 'Product',
        //     },
        //     quantity: {
        //       type: Number,
        //       required: true,
        //     },
        //   },
        // ],
      },
    ],
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'CANCELLED', 'DELIVERED'], //also states it is required
      deafult: 'PENDING',
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
