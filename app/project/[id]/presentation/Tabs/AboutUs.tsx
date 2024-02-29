import { Organization } from '@/types/types'
import { observer } from 'mobx-react-lite'

const AboutUsPage: React.FC<{
  organization: Organization
}> = observer(({ organization }) => {
  return (
    <>
      <div className="aboutUs">
        <div className="aboutUs">
          <div className="aboutUs__header">
            <p>{organization.name}</p>
          </div>
          <div className="aboutUs__text">
            <p>{organization.description}</p>
            {organization.webpage && (
              <a href={organization.webpage} target="_blank">
                Our website
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  )
})

export default AboutUsPage
