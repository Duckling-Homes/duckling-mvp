import { Home } from '@mui/icons-material'

const HomeSummary: React.FC<{}> = ({}) => {
  return (
    <div className="summaryItem">
      <div className="summaryItem__header">
        <div className="summaryItem__text">
          <Home />
          <p>Home Summary</p>
        </div>
      </div>
    </div>
  )
}

export default HomeSummary
