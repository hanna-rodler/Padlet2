<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstname',
        'lastname',
        'email',
        'image',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function padlets(): HasMany {
        return $this->hasMany(Padlet::class);
    }

    public function rights(): HasMany {
        return $this->hasMany(Right::class);
    }

    public function entries():HasMany {
        return $this->hasMany(Entry::class);
    }

    public function ratings(): hasMany {
        return $this->hasMany(Rating::class);
    }

    public function comments(): hasMany {
        return $this->hasMany(Comment::class);
    }


    public function getJWTIdentifier(){
        return $this->getKey();
    }

    public function getJWTCustomClaims(){
        // hier könnte auch die Userrolle oder so hinzugefügt werden
        // alles hier mitgegebene ist im Client verfügbar
        return ['user' => ['id' => $this->id]];
    }
}
