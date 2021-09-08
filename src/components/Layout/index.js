import s from './style.module.css';

const Layout = ({ title, descr, urlBg, colorBg }) => {
  const styleBg = urlBg ? { background: `url('${urlBg}') center center/cover no-repeat` } : {backgroundColor: colorBg};
  // const styleBgColor = colorBg ? { backgroundColor: colorBg } : {};

  console.log('### style img', styleBg);
  return (
    <section className={s.root} style={styleBg}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            <h3>{ title }</h3>
              <span className={s.separator}></span>
          </div>
          <div className={`${s.desc} ${s.full}`}>
            <p>{ descr }</p>
          </div>
        </article>
      </div>
    </section>
    )
}

export default Layout;
