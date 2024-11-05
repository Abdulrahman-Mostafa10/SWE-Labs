class ContentCreator:
    def __init__(self, name):
        self.name = name
        self.followers = []
        self.notification_manager = NotificationManager.get_instance()

    def add_follower(self, user, user_channel):
        self.followers.append((user, user_channel))
        print(f"{user.name} is now following {self.name}")

    def remove_follower(self, user):
        self.followers = [
            follower for follower in self.followers if follower[0] != user
        ]
        print(f"{user.name} un-followed {self.name}")

    def upload_content(self, content):
        print(f"{self.name} has uploaded new content: {content}")
        for follower in self.followers:
            self.notification_manager.send_notification(follower, self.name, content)


class User:
    def __init__(self, name):
        self.name = name

    def update(self, content_creator, content):
        print(
            f"{self.name} received notification: {content_creator} uploaded '{content}'"
        )


class NotificationManager:
    _instance = None

    @staticmethod
    def get_instance():
        if NotificationManager._instance is None:
            NotificationManager._instance = NotificationManager()
        return NotificationManager._instance

    def send_notification(self, user, content_creator, content):
        user[1].update(content_creator, content)


class NotificationChannelDecorator(User):
    def __init__(self, user):
        self.user = user

    @property
    def name(self):
        return self.user.name

    def update(self, content_creator, content):
        self.user.update(content_creator, content)


class EmailNotificationDecorator(NotificationChannelDecorator):
    def __init__(self, user):
        super().__init__(user)

    def update(self, content_creator, content):
        super().update(content_creator, content)
        print(f"Email sent to {self.name}: {content_creator} uploaded '{content}'")


class SMSNotificationDecorator(NotificationChannelDecorator):
    def __init__(self, user):
        super().__init__(user)

    def update(self, content_creator, content):
        super().update(content_creator, content)
        print(f"SMS sent to {self.name}: {content_creator} uploaded '{content}'")


class PushNotificationDecorator(NotificationChannelDecorator):
    def __init__(self, user):
        super().__init__(user)

    def update(self, content_creator, content):
        super().update(content_creator, content)
        print(
            f"Push notification sent to {self.name}: {content_creator} uploaded '{content}'"
        )


def main():
    creator_music_channel = ContentCreator("Music Channel")
    creator_vlog_channel = ContentCreator("Vlog Channel")

    user_alice = User("Alice")
    user_bob = User("Bob")

    alice_notification_decorator_for_music_channel = EmailNotificationDecorator(
        user_alice
    )
    bob_notification_decorator_for_music_channel = PushNotificationDecorator(
        SMSNotificationDecorator(user_bob)
    )
    creator_music_channel.add_follower(
        user_alice, alice_notification_decorator_for_music_channel
    )
    creator_music_channel.add_follower(
        user_bob, bob_notification_decorator_for_music_channel
    )

    alice_notification_decorator_for_vlog_channel = EmailNotificationDecorator(
        user_alice
    )
    creator_vlog_channel.add_follower(
        user_alice, alice_notification_decorator_for_vlog_channel
    )

    creator_music_channel.upload_content("New Song Release!")
    creator_vlog_channel.upload_content("Day in My Life Vlog")


if __name__ == "__main__":
    main()
