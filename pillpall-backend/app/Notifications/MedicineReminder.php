<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

use NotificationChannels\Fcm\FcmMessage;
use NotificationChannels\Fcm\FcmNotification;

class MedicineReminder extends Notification{

    use Queueable;

    public function __construct(){}

    public function via(object $notifiable): array{
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage{
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    public function toArray(object $notifiable): array{
        return [
            
        ];
    }

    public function toFcm($notifiable){
        return FcmMessage::create()
            ->setData([
                'title' => 'Medicine Reminder',
                'body' => $this->message,
                'click_action' => config('app.url'),
            ])
            ->setNotification(FcmNotification::create()
                ->setTitle('Medicine Reminder')
                ->setBody($this->message))
            ->setPriority('high')
            ->setTimeToLive(0);
    }
}
