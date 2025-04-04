import { useEffect, useState } from 'react';
import AnnouncementCard from './AnnouncementCard';
import { getAllAnnouncements, toggleVisibility } from '../services/announcementService';
import { Typography } from '@mui/material';
import LoadingCard from 'shared/ui/LoadingCard';

const AnnouncementList = ({ onDeleteRequest, refreshKey }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadAnnouncements = async () => {
        setLoading(true);
        const data = await getAllAnnouncements();
        setAnnouncements(data);
        setLoading(false);
    };

    useEffect(() => {
        loadAnnouncements();
    }, [refreshKey]);

    const handleToggle = async (id, isVisible) => {
        await toggleVisibility(id, isVisible);
        loadAnnouncements();
    };

    return (
        <div>
            <Typography variant="h5" className="text-[#c5e1e9]"
                sx={{
                    background: "linear-gradient(90deg, #ffffff 0%, #c5e1e9 60%, #c5e1e9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: "0.5em",
                }}>
                Avisos Criados
            </Typography>

            {loading ? (
                <LoadingCard />
            ) :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {announcements.map((a) => (
                        <AnnouncementCard
                            key={a.announcementId}
                            title={a.title}
                            content={a.content}
                            category={a.category}
                            date={a.date}
                            isVisible={a.isVisible}
                            showActions
                            onDelete={() => onDeleteRequest?.(a.announcementId)}
                            onToggle={(value) => handleToggle(a.announcementId, value)}
                        />
                    ))}
                </div>
            }
        </div>
    );
};

export default AnnouncementList;
