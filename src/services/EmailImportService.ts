import { EmailRepository } from "../datastore/repositories/EmailRepository";
import { MessageRepository } from "../datastore/repositories/MessageRepository";
import { ThreadRepository } from "../datastore/repositories/ThreadRepository";
import { UserRepository } from "../datastore/repositories/UserRepository";
import { EmailEntity } from "../model/entities/EmailEntity";
import { MessageEntity } from "../model/entities/MessageEntity";
import { ThreadEntity } from "../model/entities/ThreadEntity";
import { EmailFetcherService } from "./EmailFetcherService";

export class EmailImportService {
  constructor(
    private readonly emailFetcherService: EmailFetcherService,
    private readonly emailRepository: EmailRepository,
    private readonly messageRepository: MessageRepository,
    private readonly threadRepository: ThreadRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async import(): Promise<void> {
    const fetchedEmails = await this.retrieveAndPersistEmails();
    const defaultThread = await this.createDefaultThread();
    const messages = await Promise.all(fetchedEmails.map((email) => this.createMessageFromEmail(email, defaultThread)));
    await this.messageRepository.persist(messages);
  }

  private async retrieveAndPersistEmails() {
    const fetchedEmails = await this.emailFetcherService.fetch();
    await this.emailRepository.persist(fetchedEmails);
    return fetchedEmails;
  }

  private async createDefaultThread() {
    const singleThread = new ThreadEntity("Default Thread");
    await this.threadRepository.persist([singleThread]);
    return singleThread;
  }

  private async createMessageFromEmail(email: EmailEntity, thread: ThreadEntity): Promise<MessageEntity> {
    const user = await this.userRepository.findByEmail(email.from.email);
    const messageSenderId = user?.id ?? null;

    const message = MessageEntity.createFromEmail(messageSenderId, thread.id!, email);
    return message;
  }
}
