import { Organization } from '@/types/types'
import { observer } from 'mobx-react-lite'
import Markdown from 'react-markdown'

const AboutUsPage: React.FC<{
  organization: Organization
}> = observer(({ organization }) => {
  const orgImg = organization.picture_url || '/assets/company-profile.png'

  return (
    <div className="aboutUs">
      <div className="aboutUs__image">
        <img
          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          src={orgImg}
          alt="profile-picture"
        />
      </div>
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
