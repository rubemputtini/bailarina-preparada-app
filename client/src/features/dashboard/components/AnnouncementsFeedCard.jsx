import { useEffect, useState } from 'react';
import { getAnnouncements } from 'features/announcement/services/announcementService';
import { Card, CardContent, CircularProgress, Typography, Box } from '@mui/material';
import loudspeaker from '../../../assets/loudspeaker.png';
import AnnouncementCard from 'features/announcement/components/AnnouncementCard';

const AnnouncementsFeedCard = () => {
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
                        {announcements.map((a) => (
                            <AnnouncementCard
                                key={a.announcementId}
                                title={a.title}
                                content={a.content}
                                category={a.category}
                                date={a.date}
                                link={a.link}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AnnouncementsFeedCard;
