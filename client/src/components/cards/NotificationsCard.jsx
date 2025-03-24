import { Card, CardContent, Typography } from '@mui/material';
import loudspeaker from '../../assets/loudspeaker.png'

const NotificationsCard = () => {
    return (
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg lg:col-span-1">
            <CardContent>
                <div className="flex items-center mb-2">
                    <img src={loudspeaker} alt="Aviso" className="w-6 h-6 mr-2" />
                    <Typography variant="h6" className="font-bold">Avisos do Clube</Typography>
                </div>
                <Typography variant="body2">(Esta seção será implementada futuramente)</Typography>
            </CardContent>
        </Card>
    )
}

export default NotificationsCard