import Intent from '../../../models/Intent';
import Project from '../../../models/Project';

import { get_user_data } from './utils';

/** @param {import('express').Request} req @param {import('express').Response} res */
export default async ({ params, body }, res) => {
  const project = await Project.findOne({ code: params.project_code });

  if (!project) throw new NotFoundError('project not found');
  if (!project.configuration.chatbot.enabled_channels.includes('facebook'))
    throw new AuthorizationError(`facebook is not enabled for project ${params.project_code}`);
  res.send('OK');

  const intent = await Intent.detect_from_text(params.project_code, 'web', body.text);
  const { message_token } = project.configuration.chatbot.facebook.authentication;
  const answers = intent.get_random_answers();

  const { sender_id, text } = get_user_data(body);

  const requests = [];
  const url = `https://graph.facebook.com/v6.0/me/messages?access_token=${message_token}`;
  for (let k = 0; k < Messages.length; k += 1) {
    const blocks = Messages[k];
    for (let m = 0; m < blocks.length; m += 1) {
      const block = blocks[m];
      let response = null;
      switch (block.Type) {
        case 'Text':
          response = { text: removeMd(block.Text) };
          break;
        case 'Buttons':
          response = {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'button',
                text: removeMd(block.Title),
                buttons: block.Buttons.map(Button => ({
                  type: Button.Type === 'Write' ? 'postback' : 'web_url',
                  url: Button.Type === 'Write' ? undefined : Button.Redirect,
                  payload: Button.Type === 'Write' ? Button.Write : undefined,
                  title: removeMd(Button.Text)
                }))
              }
            }
          };
          break;
        case 'Image':
          response = {
            attachment: {
              type: 'image',
              payload: {
                url: block.Image.Source,
                is_reusable: true
              }
            }
          };
          break;
        default:
          break;
      }
      if (!response) continue;
      if (block.QuickReply && block.QuickReply.Enabled) {
        response.quick_replies = block.QuickReply.Options.map(option => ({
          content_type: 'text',
          title: option.Title,
          payload: option.Text,
          image_url: option.ImageUrl
        }));
      }
      requests.push({
        url,
        method: 'post',
        data: {
          messaging_type: 'RESPONSE',
          recipient: { id: senderId },
          message: response
        }
      });
    }
  }
  seqRequests(requests);
  const reg = {
    Team: Team.Name,
    Bot: Facebook.BotName,
    UserID: senderId,
    UserName: 'FacebookUser',
    Channel: 'Facebook',
    $push: {
      Messages: { $each: [input, formatIntent(Intent, StepName, Indexes)] }
    }
  };
  conversation.insertOrUpdate({ Channel: 'Facebook', UserID: senderId }, reg);
};
