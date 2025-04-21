import { Box, Modal } from "@mui/material";
import DialogButton from "shared/buttons/DialogButton";
import { useWindowSize } from "react-use";
import { useEffect, useState } from "react";
import AchievementShareCard from "./AchievementShareCard";

const AchievementShareDialog = ({ open, onClose, achievement }) => {
    const { height } = useWindowSize();
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const originalHeight = 640;
        const maxVisibleHeight = height * 0.75;
        const newScale = maxVisibleHeight / originalHeight;
        setScale(newScale > 1 ? 1 : newScale);
    }, [height]);

    if (!achievement) return null;

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)',
                    paddingY: 4,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <Box sx={{ overflowX: 'hidden', width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 2,
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                            maxWidth: '100vw',
                            overflow: 'hidden',
                        }}
                    >
                        <AchievementShareCard {...achievement} />

                        <p className="text-sm text-center text-gray-300 mt-2 break-words max-w-xs">
                            📲 Tire um print da tela para compartilhar nas redes sociais!
                        </p>

                        <DialogButton onClick={onClose} fullWidthOnMobile={false} variant="secondary">
                            FECHAR
                        </DialogButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AchievementShareDialog;