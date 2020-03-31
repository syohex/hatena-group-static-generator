import React from "react"
import SimpleHeader from "./SimpleHeader";
import { useStaticQuery, Link, graphql } from "gatsby"

function truncate(str, length = 30) {
    if (str.length > length) {
        return str.substr(0, length) + '...';
    } else {
        return str;
    }

}

export default ({ children, pagination }) => {
    const data = useStaticQuery(
        graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
    )
    const { prev, next } = pagination || {};
    const pager = <>
        {prev &&
            <Link to={prev.path} alt={next.label} title={next.title} className="prev">{"<" + truncate(prev.label)}</Link>
        }
        {prev && next &&
            <span className="delimiter"> | </span>
        }
        {next &&
            <Link to={next.path} alt={next.label} title={next.title} className="next">{truncate(next.label) + ">"}</Link>
        }
    </>;
    return (
        <>
            <SimpleHeader />
            <h1>
                <Link to={`/`}>
                    {data.site.siteMetadata.title}
                </Link>
            </h1>
            <div className="hatena-body">
                <div className="calendar" id="pager-top">
                    {pager}
                </div>
                <div id="days">
                    {children}
                </div>
                <div className="calendar" id="pager-bottom">
                    {pager}
                </div>
            </div>
        </>
    )
}