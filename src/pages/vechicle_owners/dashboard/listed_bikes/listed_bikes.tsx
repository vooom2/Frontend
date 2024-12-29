import { DashboardStatusIndicatorCard } from '@/components/home_status_indicator'
import BikesRecords from './bikes_records'

function ListedBikes() {
    return (
        <div className="container mx-auto p-2 lg:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <DashboardStatusIndicatorCard label="Listed Bikes" icon="bike" value="6" />
                <DashboardStatusIndicatorCard label="Active bikes" icon="bike" value="5" />
                <DashboardStatusIndicatorCard label="InActive bikes" icon="bike" value="0" />
            </div>
            <BikesRecords />
        </div>
    )
}

export default ListedBikes