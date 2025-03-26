import { useEffect, useState } from 'react';
import { getAnnouncements } from '../../services/announcementService';
import { Card, CardContent, CircularProgress, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { announcementColorsMap } from '../../utils/constants';
import loudspeaker from '../../assets/loudspeaker.png';
import LaunchIcon from '@mui/icons-material/Launch';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

dayjs.locale('pt-br');

const NotificationsCard = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAnnouncements();
            setAnnouncements(data);
            setLoading(false);
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <Card className="bg-white text-black shadow-lg lg:col-span-1">
                <CardContent>
                    <Box display="flex" justifyContent="center" my={10}>
                        <CircularProgress size={24} color="inherit" />
                    </Box>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-white text-black shadow-lg lg:col-span-1 h-full">
            <CardContent>
                <div className="flex items-center mb-2">
                    <img src={loudspeaker} alt="Aviso" className="w-6 h-6 mr-2" />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1f2937' }}>
                        Avisos do Clube
                    </Typography>
                </div>

                {announcements.length === 0 ? (
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                        Nenhum aviso disponível no momento.
                    </Typography>
                ) : (
                    <div className="max-h-64 lg:max-h-40 overflow-y-auto pr-1 space-y-3 mt-2">
                        {announcements.map((a) => {
                            const colorStyle = announcementColorsMap[a.category] || announcementColorsMap["Outros"];
                            const eventDate = dayjs(a.date).format("DD/MM - HH:mm");

                            return (
                                <Box
                                    key={a.announcementId}
                                    className={`border-l-4 ${colorStyle.tailwind} p-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <Typography variant="subtitle2" className="flex items-center gap-1" sx={{ fontWeight: 600 }}>
                                            <span>{colorStyle.icon}</span> {a.title}
                                        </Typography>
                                        <Typography variant="caption" className="text-xs text-gray-600">
                                            {eventDate}
                                        </Typography>
                                    </div>

                                    <Typography variant="body2" className="text-sm text-gray-800 mb-1">
                                        {a.content}
                                    </Typography>

                                    {a.link && (
                                        <Box className="flex justify-end mt-1">
                                            <Tooltip title="Acessar conteúdo" arrow>
                                                <IconButton
                                                    href={a.link}
                                                    target="_blank"
                                                    rel="noopener"
                                                    size="small"
                                                    sx={{ padding: 0, color: "#3B82F6" }}
                                                >
                                                    <LaunchIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    )}
                                </Box>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default NotificationsCard;
