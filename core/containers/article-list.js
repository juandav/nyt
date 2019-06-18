import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {Button} from 'antd'
import {Article} from '../components/article'
import {getMediaThumbnail} from '../utils/media'
import {BASE_MEDIA} from '../environments'
import {searchArticles} from '../store/articles/actions'

class ArticleListContainer extends Component {
  constructor(props) {
    super(props)
  }
  handleGetMore = e => {
    e.preventDefault()
    const data = {
      type_of_material: this.props.citeria_material, 
      query: this.props.criteria_query, 
      page: this.props.page + 1,
      type: "more"
    }
    this.props.searchArticles(data)
  }
  handleTagClick = e => {
    e.preventDefault()
    this.props.searchArticles({
      type_of_material: this.props.citeria_material, 
      query: e.target.name, 
      page: 0,
      type: "new"
    })
  }
  render() {
    const {articles} = this.props
    return (
      <>
      <span>
        {(articles.length > 0) && articles.map(article => {
          const thumbnail = article.multimedia.length > 0? getMediaThumbnail(article.multimedia): null
          const url = (thumbnail)? thumbnail['url']: null
          return <Article
            key={article._id}
            text={article.headline.main}
            link={article.web_url}
            src={(url)?`${BASE_MEDIA}/${url}`:null}
            description={article.snippet}
            source={article.source}
            published={moment(article.pub_date).format("lll")}
            tags={article.keywords}
            handleTagClick={this.handleTagClick}
          />})
        }
        {
          (articles.length > 0 && this.props.count <this.props.hits) &&
          <span>
            <h4>{`Displaying ${this.props.count} results of ${this.props.hits} found.`}</h4>
            <Button type="primary" onClick={this.handleGetMore}>{`Get More ${this.props.citeria_material}`}</Button>
          </span>
        }
      </span>
      </>
    )
  }
}

const mapStateToProps = ({ 
  data:{articles}, 
  meta:{citeria_material, criteria_query, hits, count, page}
}) => ({ 
  articles,
  citeria_material,
  criteria_query,
  hits,
  count,
  page
})
const mapDispatchToProps = ({ searchArticles })
export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer)