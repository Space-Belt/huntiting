import moment from 'moment';

export const dateConverter = (date: string) => {
  const now = moment(); // 현재 시간
  const inputDate = moment(date, 'YYYY/MM/DD'); // 입력된 날짜, 형식을 지정해줘야 합니다

  const duration = moment.duration(now.diff(inputDate)); // 현재 시간과 입력된 날짜의 차이

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (years > 0) {
    return `${years}년 전`;
  } else if (months > 0) {
    return `${months}달 전`;
  } else if (days > 0) {
    return `${days}일 전`;
  } else if (hours > 0) {
    return `${hours}시간 전`;
  } else if (minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
};
