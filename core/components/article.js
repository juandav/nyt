import React, {Fragment} from 'react'
import {Icon} from 'antd'
import PropTypes from 'prop-types'
import { Divider } from 'antd'
import './article.less'

const Thumbnail = ({alt,src}) => (
  <Fragment>
    <img
      className="thumbnail"
      src={src || "/static/img/default.png" } 
      alt={alt || "Article's Thumbnail"}
      width="200px"
      height="156px"
    />
    <style jsx>{`
      .thumbnail {
        padding: 0.25rem;
        vertical-align: middle;
        margin-bottom: 3rem !important;
      }
    `}</style>
  </Fragment>
)
const Headline = ({link,text}) => (
  <Fragment>
    <a href={link || "#"} target="_blank" rel="noopener noreferrer">
      <h2>{text || "This article without title"}</h2>
    </a>
    <style jsx>{`
      h2 {
        color: #007bff;
        text-decoration: none;
      }
      h2:hover {
        color: #0056b3;
        text-decoration: underline;
      }
    `}</style>
  </Fragment>
)
const Snippet = ({description}) => (<p>{description || "This article without short description"}</p>)  
const Source = ({source}) => (<p className="p-mod"><strong>Source: </strong>{source || "none"}</p>)
const Published = ({published}) => (<p className="p-mod"><strong>Published: </strong>{published || "none"}</p>)
const Keywords = ({tags=[], handleTagClick}) => (
  <p>
    <Icon type="tag" />
    {tags.map(tag => <a className="tag" onClick={handleTagClick} key={tag.value} name={tag.value}>{tag.value}</a>)}
    <style jsx>{`
      a {
        color: #007bff;
        text-decoration: none;
      }
      a:hover {
        color: #0056b3;
        text-decoration: underline;
      }
      .tag {
        padding: 0 8px;
        margin-left: 0.5rem !important;
      }
    `}</style>
  </p>
)

const Article = props => {
  return (
    <>
      <div className='row'>
        <div className='column coverage-1'><Thumbnail src={props.src} alt={props.alt || null} /></div>
        <div className='column coverage-10'>
          <Headline link={props.link || null} text={props.text || null}/>
          <Snippet description={props.description || null}/>
          <Source source={props.source || null} />
          <Published published={props.published || null} />
          <Keywords tags={props.tags || []} handleTagClick={props.handleTagClick} />
        </div>
      </div>
      <Divider type="horizontal" />
      <style jsx>{`
        .row {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          height: auto;
        }
        .column {
          display: flex;
          flex-direction: column;
          flex-basis: 100%;
          height: auto;
        }
        .coverage-1 {
          margin: 0;
          flex: 1;
          padding: 0 8px;
          align-items: center;
        }
        .coverage-10 {
          margin: 0;
          flex: 4;
          padding: 0 8px;
        }
      `}</style>
    </>
  )
}

Article.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  description: PropTypes.string,
  source: PropTypes.string,
  published: PropTypes.string,
  tags: PropTypes.array,
}

export {Article}