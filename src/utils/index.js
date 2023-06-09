import moment from "moment";
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, " ") +
      '"}'
  );
}
export function sanitizeTitle(title) {
  var slug = "";
  // Change to lower case
  var titleLower = title.toLowerCase();
  // Letter "e"
  slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, "e");
  // Letter "a"
  slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, "a");
  // Letter "o"
  slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, "o");
  // Letter "u"
  slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, "u");
  // Letter "d"
  slug = slug.replace(/đ/gi, "d");
  // Trim the last whitespace
  slug = slug.replace(/\s*$/g, "");
  // Change whitespace to "-"
  slug = slug.replace(/\s+/g, "-");

  return slug;
}
export function dateToOurTimeZone(date) {
  return moment(moment(date) + (300 - moment().utcOffset()) * 60 * 1000);
}

export function orderBy(data, field, type = 'asc', byLength = false) {
  if (data && data.length) {
    data.sort((a, b) => {
      if (!byLength) {
        if (a[field] > b[field]) {
          if (type == 'asc') {
            return 1;
          }
          if (type == 'desc') {
            return -1;
          }
        }
        if (a[field] < b[field]) {
          if (type == 'asc') {
            return -1;
          }
          if (type == 'desc') {
            return 1;
          }
        }
      } else {
        if (a[field].length > b[field].length) {
          if (type == 'asc') {
            return 1;
          }
          if (type == 'desc') {
            return -1;
          }
        }
        if (a[field].length < b[field].length) {
          if (type == 'asc') {
            return -1;
          }
          if (type == 'desc') {
            return 1;
          }
        }
      }
      return 0;
    });
  }
  return data;
}

export function generatePagination(currentPage, totalPages) {
  if (totalPages > 1) {
    let offset = 4;
    let from = currentPage - offset;
    if (from < 1) {
      from = 2;
    }
    let to = from + offset * 2;
    if (to >= totalPages) {
      let diff = to - totalPages;
      to = totalPages;
      from = from - diff;
      if (from < 1) {
        from = 2;
      }
    }
    let pagesArray = [1];
    for (let page = from; page < to; page++) {
      pagesArray.push(page);
    }
    pagesArray.push(totalPages);
    return pagesArray;
  }
  return [];
}
