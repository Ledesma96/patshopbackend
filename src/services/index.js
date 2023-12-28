import CartsMongo from "../DAO/mongo/cart.mongo.js";
import CartsRepository from "./carts.services.js";

import ProductsMongo from "../DAO/mongo/products.mongo.js";
import ProductsServices from "./products.services.js";

import MessagesMongo from "../DAO/mongo/messages.mongo.js";
import MessagesServices from "./messages.services.js";

import OrdersMongo from "../DAO/mongo/orders.mongo.js";
import OrdersServices from "./orders.services.js";

import CommentsMongo from "../DAO/mongo/comments.mongo.js";
import CommentsServices from "./coments.services.js";

const cartsServices = new CartsRepository( new CartsMongo());

const productsService = new ProductsMongo(new ProductsServices());

const messagesService = new MessagesMongo(new MessagesServices());

const ordersService = new OrdersMongo(new OrdersServices());

const commentsServices = new CommentsMongo(new CommentsServices());

export {cartsServices, productsService, messagesService, ordersService, commentsServices}