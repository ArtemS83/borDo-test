import React from 'react';
import style from './Table.module.css';
// import newsApi from '../../services/newsApi';

function Table({ news }) {
  return (
    <table className={style.table}>
      <caption className={style.caption}>News</caption>
      <thead className={style.thead}>
        <tr className={style.tr}>
          <th className={style.th}>Time</th>
          <th className={style.th}>Title</th>
          <th className={style.th}>Domain</th>
        </tr>
      </thead>
      <tbody>
        {news?.map(item => (
          <tr key={item.id} className={style.tr}>
            <a href={item.url} target="_blank">
              <td className={style.td}>{toISODate(item.time)}</td>
              <td className={style.td}>{item.title}</td>
              <td className={style.td}>{item.domain}</td>
            </a>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function toISODate(milliseconds) {
  const date = new Date(milliseconds);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  h = h < 10 ? '0' + h : h;
  min = min < 10 ? '0' + min : min;
  s = s < 10 ? '0' + s : s;
  return [y, m, d].join('-') + ' ' + [h, min, s].join(':');
}

export default Table;
