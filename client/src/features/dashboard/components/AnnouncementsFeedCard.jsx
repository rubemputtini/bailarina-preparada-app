import { useEffect, useState } from 'react';
import { getAnnouncements } from 'features/announcement/services/announcementService';
import { Card, CardContent, Typography } from '@mui/material';
import loudspeaker from '../../../assets/loudspeaker.png';
import AnnouncementCard from 'features/announcement/components/AnnouncementCard';
import LoadingCard from 'shared/ui/LoadingCard';

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

    return (
        <Card className="bg-white text-black shadow-lg lg:col-span-1 h-full">
            <CardContent>
                <div className="flex items-center mb-2">
                    <img src={loudspeaker} alt="Aviso" className="w-6 h-6 mr-2" />
                    <Typography variant="h6" className="font-bold text-gray-800">
                        Avisos do Clube
                    </Typography>
                </div>

                {loading ? (
                    <LoadingCard marginY={5} />
                )
                    :
                    announcements.length === 0 ? (
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
