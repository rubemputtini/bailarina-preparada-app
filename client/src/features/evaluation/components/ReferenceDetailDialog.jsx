import { Box, Modal } from "@mui/material";
import { motion } from "framer-motion";
import DialogButton from "shared/buttons/DialogButton";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const ReferenceDetailDialog = ({ open, onClose, references, exerciseName }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl p-6 w-[90vw] max-w-md shadow-2xl border border-gray-200">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center"
                >
                    <div className="flex justify-center mb-4">
                        <div className="bg-purple-100 p-3 rounded-full">
                            <InformationCircleIcon className="w-8 h-8 text-purple-600" />
                        </div>
                    </div>

                    <h3 className="text-lg font-bold mb-4 text-gray-800">{exerciseName}</h3>

                    <div className="space-y-2 mb-6 text-sm text-gray-700 text-left">
                        {references.map((ref, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-lg px-4 py-2 shadow-sm flex justify-between items-center"
                            >
                                <span className="font-medium">{ref.classification}</span>
                                <span className="text-gray-600">
                                    {ref.maxValue != null
                                        ? `${ref.minValue} a ${ref.maxValue}`
                                        : `${ref.minValue} ou mais`}
                                </span>
                            </div>
                        ))}
                    </div>

                    <DialogButton onClick={onClose}>FECHAR</DialogButton>
                </motion.div>
            </Box>
        </Modal>
    );
};

export default ReferenceDetailDialog;
