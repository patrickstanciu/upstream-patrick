import { EmailRepository } from "../datastore/repositories/EmailRepository";
import { MessageRepository } from "../datastore/repositories/MessageRepository";
import { ThreadRepository } from "../datastore/repositories/ThreadRepository";
import { UserRepository } from "../datastore/repositories/UserRepository";

export class MessageDisplayService {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly threadRepository: ThreadRepository,
    private readonly userRepository: UserRepository,
    private readonly emailRepository: EmailRepository
  ) {}

  public async displayMessages(): Promise<void> {
    const messages = await this.messageRepository.findAll();
    const threads = await this.threadRepository.findAll();
    const senders = await this.userRepository.findAll();
    const emails = await this.emailRepository.findAll();

    const formatText = (text: string, length: number): string => {
      if (text.length > length) {
        return text.substring(0, length - 3) + "...";
      }
      return text.padEnd(length);
    };

    for (const thread of threads) {
      const threadMessages = messages.filter((message) => message.threadId === thread.id);
      console.log(`\nThread: ${formatText(thread.name, 20)}`);
      for (const message of threadMessages) {
        const sender = senders.find((sender) => sender.id === message.senderId);
        const email = emails.find((email) => email.id === message.emailId);
        const actualSender = formatText(sender?.displayName ?? email!.from.email.value!, 20);
        const truncatedBody = formatText(message.body, 100);
        const formattedDate = formatText(message.date.toLocaleDateString(), 10);

        console.log(`   ${formattedDate} ${actualSender}: ${truncatedBody}`);
      }
    }
  }
}
