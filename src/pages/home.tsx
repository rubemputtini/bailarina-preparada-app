import { useList } from "@pankod/refine-core"
import { Box, Typography, Stack } from "@pankod/refine-mui"

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent
} from "components"

const home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Menu
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart 
          title="Treinos Concluídos"
          value={23}
          series={[75, 25]}
          colors={["#475BE8", "#E4E8EF"]}
        />
        <PieChart 
          title="Total Pontos"
          value={550}
          series={[60, 40]}
          colors={["#475AE8", "#E4B8EF"]}
        />
        <PieChart 
          title="Total Posts"
          value={80}
          series={[75, 25]}
          colors={["#275BE8", "#C4E8EF"]}
        />
        <PieChart 
          title="Pontos na semana"
          value={12}
          series={[75, 25]}
          colors={["#475JE8", "#E4R8EF"]}
        />
      </Box>

      <Stack mt="25px" width="100%" direction={{ xs: "column", lg: "row"}} gap={4}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  )
}

export default home