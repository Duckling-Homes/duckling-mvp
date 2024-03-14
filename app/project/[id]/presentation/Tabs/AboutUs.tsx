import { Organization } from '@/types/types'
import { observer } from 'mobx-react-lite'
import Markdown from 'react-markdown'

const AboutUsPage: React.FC<{
  organization: Organization
}> = observer(({ organization }) => {
  return (
    <div className="aboutUs">
      {organization.picture_url && (
        <div className="aboutUs__image">
          <img src={organization.picture_url} alt="profile-picture" />
        </div>
      )}
      <div className="aboutUs__content">
        <div className="aboutUs__header">
          <p>{organization.name}</p>
        </div>
        <div className="aboutUs__text">
          <Markdown>{organization.description}</Markdown>
        </div>
        {organization.webpage && (
          <div>
            <a href={organization.webpage} target="_blank">
              Our website
            </a>
          </div>
        )}
      </div>
    </div>
  )
})

export default AboutUsPage
