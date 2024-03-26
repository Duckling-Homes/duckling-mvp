import { Organization } from '@/types/types'
import { observer } from 'mobx-react-lite'
import Markdown from 'react-markdown'

const Article: React.FC<{
  imageUrl: string
  title: string
  articleUrl: string
}> = ({ imageUrl, title, articleUrl }) => {
  return (
    <div className="aboutUs__article">
      <img src={imageUrl} alt="article-picture" />
      <span>
        <a href={articleUrl}>{title}</a>
      </span>
    </div>
  )
}

const AboutUsPage: React.FC<{
  organization: Organization
}> = observer(({ organization }) => {
  const orgImg = organization?.picture_url || '/assets/company-profile.png'

  return (
    <div className="aboutUs">
      <div className="aboutUs__header">
        <div className="aboutUs__image">
          <img
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            src={orgImg}
            alt="profile-picture"
          />
        </div>
        <div className="aboutUs__content">
          <div className="aboutUs__title">
            <p>{organization?.name}</p>
          </div>
          {organization?.webpage && (
            <div>
              <a href={organization?.webpage} target="_blank">
                Our website
              </a>
            </div>
          )}
          <div className="aboutUs__text">
            <Markdown>{organization?.description}</Markdown>
          </div>
        </div>
      </div>

      <div className="aboutUs__learnMore">
        <div className="aboutUs__title">
          <p>Learn more about us</p>
        </div>
        <div className="aboutUs__articles">
          {organization?.articles &&
            organization?.articles.map((article, index) => (
              <Article
                key={index}
                imageUrl={article.imageUrl}
                title={article.title}
                articleUrl={article.url}
              />
            ))}
        </div>
      </div>
    </div>
  )
})

export default AboutUsPage
