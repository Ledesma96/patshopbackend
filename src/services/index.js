import CartsMongo from "../DAO/mongo/cart.mongo.js";
import CartsRepository from "./carts.services.js";
const cartsServices = new CartsRepository( new CartsMongo());

import ProductsMongo from "../DAO/mongo/products.mongo.js";
import ProductsServices from "./products.services.js";
const productsService = new ProductsMongo(new ProductsServices());

import MessagesMongo from "../DAO/mongo/messages.mongo.js";
import MessagesServices from "./messages.services.js";
const messagesService = new MessagesMongo(new MessagesServices());

import OrdersMongo from "../DAO/mongo/orders.mongo.js";
import OrdersServices from "./orders.services.js";
const ordersService = new OrdersMongo(new OrdersServices());

import CommentsMongo from "../DAO/mongo/comments.mongo.js";
import CommentsServices from "./coments.services.js";
const commentsServices = new CommentsMongo(new CommentsServices());

import UsersMongo from "../DAO/mongo/users.mongo.js";
import UsersServices from "./user.services.js";
const usersServices = new UsersMongo(new UsersServices())

import StripeClass from "../DAO/stripe/stripe.js";
import StripeServices from "./stripe.services.js";
const stripeServices = new StripeClass(new StripeServices())

export {cartsServices, productsService, messagesService, ordersService, commentsServices, usersServices, stripeServices}