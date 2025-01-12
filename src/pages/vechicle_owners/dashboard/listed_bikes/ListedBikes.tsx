import { DashboardInfoCard } from '@/components/dashboard_info_card'
import BikesRecordTable from './bikes_record_table'

function ListedBikes() {
    return (
        <div className="container mx-auto p-2 lg:p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <DashboardInfoCard label="Listed Bikes" icon="bike" value="6" />
                <DashboardInfoCard label="Active bikes" icon="bike" value="5" />
                <DashboardInfoCard label="InActive bikes" icon="bike" value="0" />
            </div>
            <BikesRecordTable />
        </div>
    )
}

export default ListedBikes