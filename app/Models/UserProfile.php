<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\UserProfile
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $username
 * @property string|null $avatar
 * @property string|null $bio
 * @property \Illuminate\Support\Carbon|null $birth_date
 * @property string|null $gender
 * @property string|null $location
 * @property string|null $website
 * @property array|null $social_links
 * @property array|null $reading_preferences
 * @property bool $is_author
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereBio($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereBirthDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereIsAuthor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereReadingPreferences($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereSocialLinks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereUsername($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile whereWebsite($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserProfile authors()
 * @method static \Database\Factories\UserProfileFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class UserProfile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'username',
        'avatar',
        'bio',
        'birth_date',
        'gender',
        'location',
        'website',
        'social_links',
        'reading_preferences',
        'is_author',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'birth_date' => 'date',
        'social_links' => 'array',
        'reading_preferences' => 'array',
        'is_author' => 'boolean',
    ];

    /**
     * Scope a query to only include authors.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAuthors($query)
    {
        return $query->where('is_author', true);
    }

    /**
     * Get the user that owns the profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}