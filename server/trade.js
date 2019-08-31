/**
 * author：Zhaojunjie
 * 资讯接口列表
 * 2019-08-20
 *
 * * */
import request from './request';

//首页-行业资讯幻灯
export const slideApi = params => {
  return request.get(`/office/article/slides`, params);
};

//首页-资讯头条
export const headArtApi = params => {
  return request.get(`/office/article/leadNews`, params);
};

//首页-税务视频
export const taxVideoApi = params => {
  return request.get(`/office/article/video`, params);
};

//首页-热门百科
export const hotBkApi = params => {
  return request.get(`/office/article/popular`, params);
};

//热门问答列表
export const hotAnswerApi = params => {
  return request.get(`/office/questionAnswering/hotAnswerList`, params);
};

//财税问答-最近回答
export const nearAnswerApi = params => {
  return request.get(`/office/questionAnswering/nearestQuestionAnswerList`, params);
};

//财税问答-待回答问题
export const awaitAnswerApi = params => {
  return request.get(`/office/questionAnswering/noResponseQuestionList`, params);
};

//文章详情
export const artDetailApi = params => {
  return request.get(`/office/detail/${params.id}`);
};

//行业资讯-政策资讯
export const newsArtApi = params => {
  return request.get(`/office/article/news`, params);
};

//行业资讯-财税百科
export const baikeArtApi = params => {
  return request.get(`/office/article/baike`, params);
};

//文章详情页-相关阅读|| 视频-猜你喜欢
export const relateArtApi = params => {
  return request.get(`/office/article/relate`, params);
};

//文章详情页-推荐阅读
export const recomArtApi = params => {
  return request.get(`/office/article/recommend`, params);
};

//资讯侧栏-推荐资讯
export const recomNewArtApi = params => {
  return request.get(`/office/article/recommendNews`, params);
};

//资讯侧栏-热门百科
export const recomBaikeApi = params => {
  return request.get(`/office/article/recommendBaike`, params);
};

//资讯侧栏-推荐问答
export const recomAnswerListApi = params => {
  return request.get(`/office/questionAnswering/recommend`, params);
};

//添加评论
export const addRemark = params => {
  return request.get(`/office/comment/add`, params);
};

//视频-相关视频
export const relateVideoApi = params => {
  return request.get(`/office/article/relateVideo`, params);
};

//问答详情页-问答详情
export const answerDetailApi = params => {
  return request.get(`/office/questionAnswering/allAwaitAnswersList`, params);
};
//问题详情页-回答列表
export const answerListApi = params => {
  return request.get(`/office/questionAnswering/allAnswersList`, params);
};

//问答详情页-相关问答
export const recentQueApi = params => {
  return request.get(`/office/questionAnswering/relativeQuestion`, params);
};

//问答-提交问题
export const subQueApi = params => {
  return request.post(`/office/questionAnswering/submitQuestion`, params);
};

//问答-提交回答
export const subAnswerApi = params => {
  return request.post(`/office/questionAnswering/addAnswer`, params);
};

//文章|视频详情页-添加评论
export const subReplyApi = params => {
  return request.post(`/office/comment/add`, params);
};

//文章|视频详情页-评论列表
export const getReplyListApi = params => {
  return request.get(`/office/comment/articleComment`, params);
};
