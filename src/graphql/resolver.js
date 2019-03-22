const model = require('../../db/mongoose').model;
const Post = model.post;
const Comment = model.comment;
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const resolvers = {
  Query: {
    getAllPosts: async (_, { n: n, offset = 0 }) => {
      const find = await model.post.find({}).exec();
      const totalCount = find.length;
      const result =
        n === undefined ? find.slice(offset) : find.slice(offset, offset + n);
      const results = {
        result,
        totalCount,
        offset,
      };
      return results;
    },
    getAllComments: async (_, { n: n, offset = 0 }) => {
      const find = await model.comment.find({}).exec();
      const totalCount = find.length;
      const result =
        n === undefined ? find.slice(offset) : find.slice(offset, offset + n);
      const results = {
        result,
        totalCount,
        offset,
      };
      return results;
    },
    getPostsbyUserId: async (_, { author: author, n: n, offset = 0 }) => {
      const find = await model.post.find({ author: author }).exec();
      const totalCount = find.length;
      const result =
        n === undefined ? find.slice(offset) : find.slice(offset, offset + n);
      const results = {
        result,
        totalCount,
        offset,
      };
      return results;
    },
    getCommentsbyUserId: async (_, { author: author, n: n, offset = 0 }) => {
      const find = await model.comment.find({ author: author }).exec();
      const totalCount = find.length;

      const result =
        n === undefined ? find.slice(offset) : find.slice(offset, offset + n);
      const results = {
        result,
        totalCount,
        offset,
      };
      return results;
    },
    getCommentsbyPostId: async (_, { post: post, n: n, offset = 0 }) => {
      const find = await model.comment.find({ post: post }).exec();
      const totalCount = find.length;

      const result =
        n === undefined ? find.slice(offset) : find.slice(offset, offset + n);
      const results = {
        result,
        totalCount,
        offset,
      };
      return results;
    },
  },
  ISODate: new GraphQLScalarType({
    name: 'ISODate',
    description: 'JavaScript Date object as an ISO timestamp',
    serialize(value) {
      return value instanceof Date ? value.toISOString() : null;
    },
    parseValue(value) {
      return returnOnError(
        () => (value == null ? null : new Date(value)),
        null,
      );
    },
    parseLiteral(ast) {
      return ast.kind === Kind.STRING ? parseValue(ast.value) : null;
    },
  }),
};

module.exports = resolvers;
