import SendEmailWhenProductIsCreatedHandler from '../../product/events/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../product/events/product-created.event';
import EventDispatcher from './event-dispatcher';

describe('Domain event tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    const event = eventDispatcher.getEventHandlers['ProductCreatedEvent'];

    expect(event).toBeDefined();
    expect(event.length).toBe(1);
    expect(event[0]).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    const event = eventDispatcher.getEventHandlers['ProductCreatedEvent'];

    expect(event).toBeDefined();
    expect(event.length).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    const event = eventDispatcher.getEventHandlers['ProductCreatedEvent'];

    expect(event).toBeUndefined();
  });

  it('should notify an event', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spy = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    const event = new ProductCreatedEvent({
      id: 1,
      name: 'Product 1',
      price: 10,
      description: 'Description 1',
    });

    eventDispatcher.notify(event);

    expect(spy).toHaveBeenCalled();
  });
});
