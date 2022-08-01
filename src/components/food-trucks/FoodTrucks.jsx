import React from 'react';
import {Typography} from '@mui/material';
import {useGlobalState} from 'utils/stateContext';
import PageContainer from 'components/Containers/PageContainer';
import LinkedCard from 'components/LinkedCard';

function FoodTrucks() {
  const {store} = useGlobalState();
  const {foodTrucks} = store;
  console.log(foodTrucks);

  const foodTruckImg =
    'https://cdn.shopify.com/s/files/1/0619/1700/3994/files/Ballistic-Beer-Our-Story-About-Us-1.jpg?crop=top&height=275&v=1650431502&width=275';

  return (
    <PageContainer title="Food Trucks">
      {foodTrucks.map((foodTruck) => {
        return (
          <LinkedCard
            key={foodTruck.id}
            imgPath={foodTruckImg}
            item={foodTruck}
            routePath={'foodTrucks'}
          >
            <Typography component="div" variant="h6">
              {foodTruck.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {foodTruck.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {foodTruck.start_time}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {foodTruck.finish_time}
            </Typography>
          </LinkedCard>
        );
      })}
    </PageContainer>
  );
}

export default FoodTrucks;
