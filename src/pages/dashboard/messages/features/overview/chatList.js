import React from "react";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import moment from "moment";

import ChatTile from "components/general/chatTile";
import { DEFAULT_AVATAR } from "utils/constants";
import MessagesStore from "../../store";

const ChatList = ({ data }) => {
  const { setCurrentChat } = MessagesStore;

  return (
    <div className="flex flex-col justify-start items-start w-full h-fit p-6 max-h-fit">
      {data?.map(
        (
          {
            agentImage,
            agentName,
            lastMessage,
            lastMessageAt,
            agentPhoneNumber,
            unreadAgentChats,
            ...rest
          },
          i
        ) => {
          return (
            <ChatTile
              key={i}
              image={agentImage || DEFAULT_AVATAR}
              title={agentName}
              label={lastMessage}
              count={unreadAgentChats}
              date={moment(new Date(lastMessageAt?.toDate())).fromNow()}
              read={unreadAgentChats < 1}
              onClick={() => {
                setCurrentChat({
                  agentImage,
                  agentName,
                  lastMessage,
                  lastMessageAt,
                  agentPhoneNumber,
                  unreadAgentChats,
                  ...rest,
                });
              }}
            />
          );
        }
      )}
    </div>
  );
};
ChatList.propTypes = {
  data: PropTypes.array,
};
export default observer(ChatList);
