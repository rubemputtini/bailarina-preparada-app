import React from "react";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { getShortName } from "shared/utils/nameUtils";

const ResponsiveUserName = ({
    name,
    variant = "body1",
    className = "",
    align = "left",
    mobileOnlyTruncate = true,
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const displayName = isMobile ? getShortName(name) : name;

    const appliedClassName = mobileOnlyTruncate
        ? isMobile
            ? `truncate ${className}`
            : className
        : `truncate ${className}`;

    const appliedStyle = mobileOnlyTruncate
        ? isMobile
            ? { maxWidth: "200px" }
            : {}
        : { maxWidth: "200px" };

    return (
        <Typography
            variant={variant}
            className={appliedClassName}
            style={appliedStyle}
            title={name}
            align={align}
        >
            {displayName}
        </Typography>
    );
};

export default ResponsiveUserName;