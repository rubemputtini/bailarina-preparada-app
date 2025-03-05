import { Card, CardContent, Typography } from '@mui/material'

const NotificationsCard = () => {
    return (
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg lg:col-span-1">
            <CardContent>
                <Typography variant="h6" className="font-bold" style={{ marginBottom: "0.5em" }}>📣 Avisos do Clube</Typography>
                <Typography variant="body2">(Esta seção será implementada futuramente)</Typography>
            </CardContent>
        </Card>
    )
}

export default NotificationsCard