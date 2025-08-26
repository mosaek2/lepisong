import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:4200', 'http://localhost:4201'],
    credentials: true,
  },
})
export class QueueGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('QueueGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('queue:add')
  handleAddToQueue(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.logger.log('Queue add event received', data);
    // Broadcast to all clients
    this.server.emit('queue:updated', data);
  }

  @SubscribeMessage('queue:remove')
  handleRemoveFromQueue(@MessageBody() queueId: string, @ConnectedSocket() client: Socket) {
    this.logger.log('Queue remove event received', queueId);
    // Broadcast to all clients
    this.server.emit('queue:updated', { queueId, action: 'remove' });
  }

  @SubscribeMessage('queue:reorder')
  handleReorderQueue(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.logger.log('Queue reorder event received', data);
    // Broadcast to all clients
    this.server.emit('queue:updated', data);
  }

  @SubscribeMessage('player:play')
  handlePlayerPlay(@ConnectedSocket() client: Socket) {
    this.logger.log('Player play event received');
    // Broadcast to all clients
    this.server.emit('player:state', { isPlaying: true });
  }

  @SubscribeMessage('player:pause')
  handlePlayerPause(@ConnectedSocket() client: Socket) {
    this.logger.log('Player pause event received');
    // Broadcast to all clients
    this.server.emit('player:state', { isPlaying: false });
  }

  @SubscribeMessage('player:volume')
  handlePlayerVolume(@MessageBody() volume: number, @ConnectedSocket() client: Socket) {
    this.logger.log('Player volume event received', volume);
    // Broadcast to all clients
    this.server.emit('player:state', { volume });
  }

  @SubscribeMessage('player:next')
  handlePlayerNext(@ConnectedSocket() client: Socket) {
    this.logger.log('Player next event received');
    // Broadcast to all clients
    this.server.emit('player:next');
  }

  // Helper methods for broadcasting events from services
  broadcastQueueUpdate(queue: any[]) {
    this.server.emit('queue:updated', queue);
  }

  broadcastPlayerState(state: any) {
    this.server.emit('player:state', state);
  }

  broadcastVideoChanged(video: any) {
    this.server.emit('player:video-changed', video);
  }

  broadcastUserJoined(user: any) {
    this.server.emit('user:joined', user);
  }

  broadcastUserLeft(userId: string) {
    this.server.emit('user:left', userId);
  }
}