import {View, Text} from 'react-native';
import React from 'react';
import ContactTabContainer from './ContactTabContainer';
import ContactTab from './ContactTab';
import moment from 'moment';

interface ContactMainTabProps {
  data: any;
}

const ContactMainTab: React.FC<ContactMainTabProps> = ({data}) => {
  const [statusCompletedAdminTab, setStatusCompletedAdminTab] =
    React.useState<boolean>(false);

  return (
    <ContactTabContainer
      status={data?.status?.toLowerCase()}
      showButton={data?.admin}
      onPress={() => {
        setStatusCompletedAdminTab(value => !value);
      }}>
      <ContactTab
        profile={data?.profile}
        name={data?.user_name}
        text={data?.description}
        date={data?.updated_at}
        // date={moment(data?.updated_at, 'DD MMM, YYYY hh:mm A').format(
        //   'MMM DD, YYYY hh:mm A',
        // )}
        enquiryText={data?.inquiry_type}
        onPress={() => {}}
      />
      {statusCompletedAdminTab && (
        <ContactTab
          admin={true}
          profile={data?.admin?.admin_profile}
          name={data?.admin?.name}
          text={data?.admin?.admin_reply}
          date={`Response Received on ${data?.admin?.submited_date}`}
          // date={`Response Received on ${moment(
          //   data?.admin?.submited_date,
          //   'DD MMM, YYYY hh:mm A',
          // ).format('MMM DD, YYYY hh:mm A')}`}
          onPress={() => {}}
        />
      )}
    </ContactTabContainer>
  );
};

export default ContactMainTab;
