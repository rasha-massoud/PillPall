<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\Fcm\FcmMessage;
use NotificationChannels\Fcm\FcmNotification;

class MedicineReminder extends Notification{
    use Queueable;

    protected $message;

    public function __construct($message){
        $this->message = $message;
    }

    public function via($notifiable){
        return ['mail', 'database'];
    }

    public function toMail($notifiable){
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line($this->message);
    }

    public function toDatabase($notifiable){
        return [
            'message' => $this->message,
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