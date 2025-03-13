const GET_ALL_BLOGS_QUERY = `
  query ($first: Int) {
    blogs(orderBy: createdAt_DESC, first: $first) {
      id
      title
      content
      likesRef(first: 100) {
        id
        userId
      }
      image {
        url
        width
        height
      }
      backgroundColor {
        css
      }
      createdBy {
        name
        picture
      }
      createdAt
    }
  }
`;

const GET_SINGLE_BLOG_QUERY = `
  query ($blogId: ID!) {
    blog(where: { id: $blogId }) {
      id
      title
      content
      likesRef(first: 100) {
        id
        userId
      }
      image {
        url
        width
        height
      }
      backgroundColor {
        css
      }
      createdBy {
        name
        picture
      }
      createdAt
    }
  }
`;

const CREATE_LIKE_MUTATION = `
  mutation ($userId: String!, $blogId: ID!) {
    createLike(
      data: {
        userId: $userId,
        blogRef: { connect: { id: $blogId } }
      }
    ) {
      id
      blogRef { id }
    }
  }
`;

const PUBLISH_BLOG_MUTATION = `
          mutation ($blogId: ID!) {
            publishBlog(
              where: { id: $blogId }, 
              to: PUBLISHED) { id }
            }
        `;

const PUBLISH_LIKE_MUTATION = `
             mutation($likeId: ID!) {
              publishLike(
                  where: { 
                      id: $likeId
                      }, 
                      to: PUBLISHED) {
                          id
                          blogRef {
                            id
                          }
                        }
                      }
          `;

export const queryConfig = (params: {
  blogId?: string;
  userId?: string;
  likeId?: string;
  first?: string;
}) => {
  console.log("params", params);
  return {
    getAllBlogs: {
      query: GET_ALL_BLOGS_QUERY,
      variables: { first: Number(params.first) },
    },
    getSingleBlog: params.blogId
      ? {
          query: GET_SINGLE_BLOG_QUERY,
          variables: { blogId: params.blogId },
        }
      : null,
    createLike:
      params.blogId && params.userId
        ? {
            query: CREATE_LIKE_MUTATION,
            variables: { blogId: params.blogId, userId: params.userId },
          }
        : null,
    publishBlog: params.blogId
      ? { query: PUBLISH_BLOG_MUTATION, variables: { blogId: params.blogId } }
      : null,
    publishLike: params.likeId
      ? { query: PUBLISH_LIKE_MUTATION, variables: { likeId: params.likeId } }
      : null,
  };
};
