import { socket_io } from '../../../utils/socket_io';
import { NAMESPACE } from '../constants';

export default messages => {
  socket_io.of(NAMESPACE).emit('new_messages', messages);
};
