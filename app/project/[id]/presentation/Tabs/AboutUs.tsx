import { Organization } from '@/types/types'
import { observer } from 'mobx-react-lite'

const AboutUsPage: React.FC<{
  organization: Organization
}> = observer(({ organization }) => {
  const descr =
    'Lorem ipsum dolor sit amet consectetur. Leo odio proin eget amet in elementum neque purus. Et bibendum et mollis felis diam sit laoreet tristique in. Vulputate vitae aliquet imperdiet malesuada erat.'

  const webpage = 'www.google.com'

  return (
    <div className="aboutUs">
      <div className="aboutUs__image">
        <img src="/assets/company-profile.png" />
      </div>
      <div className="aboutUs__content">
        <div className="aboutUs__header">
          <p>{organization.name}</p>
        </div>
        <div className="aboutUs__text">
          <p>{descr}</p>
        </div>
        {webpage && (
          <div>
            <a href={webpage} target="_blank">
              Our website
            </a>
          </div>
        )}
      </div>
    </div>
  )
})

export default AboutUsPage
