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
      comment(orderBy: createdAt_DESC, first: 100) {
        id
        userId
        content
        userImgUrl
        createdAt
      }
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
      comment(orderBy: createdAt_DESC, first: 100) {
        id
        userId
        content
        userImgUrl
        createdAt
      }
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

const CREATE_COMMENT_MUTATION = `
  mutation($userId: String!, $userImgUrl: String!, $content: String!, $blogId: ID!) {
    createComment(data: {
      userId: $userId
      userImgUrl: $userImgUrl
      content: $content
      blog: {
        connect: { id: $blogId }
      }
    })
    { id }
  }
`;

const PUBLISH_COMMENT_MUTATION = `
  mutation($commentId: ID!) {
    publishComment(where: { id: $commentId }, to: PUBLISHED) {
      id
      blog {
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
  content?: string;
  userImgUrl?: string;
  commentId?: string;
}) => {
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
    createComment:
      params.blogId && params.userId && params.content && params.userImgUrl
        ? {
            query: CREATE_COMMENT_MUTATION,
            variables: {
              blogId: params.blogId,
              userId: params.userId,
              content: params.content,
              userImgUrl: params.userImgUrl,
            },
          }
        : null,
    publishComment: params.commentId
      ? {
          query: PUBLISH_COMMENT_MUTATION,
          variables: { commentId: params.commentId },
        }
      : null,
  };
};
