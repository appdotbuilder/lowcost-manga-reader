<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\ReadingHistory
 *
 * @property int $id
 * @property int $user_id
 * @property int $story_id
 * @property int|null $chapter_id
 * @property float $progress
 * @property array|null $bookmark_data
 * @property \Illuminate\Support\Carbon $last_read_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read User $user
 * @property-read Story $story
 * @property-read Chapter|null $chapter
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory whereBookmarkData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory whereChapterId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory whereLastReadAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory whereProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory whereStoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReadingHistory whereUserId($value)
 * @method static \Database\Factories\ReadingHistoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class ReadingHistory extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'story_id',
        'chapter_id',
        'progress',
        'bookmark_data',
        'last_read_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'progress' => 'decimal:2',
        'bookmark_data' => 'array',
        'last_read_at' => 'datetime',
    ];

    /**
     * Get the user that owns the reading history.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the story that the reading history belongs to.
     */
    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }

    /**
     * Get the chapter that the reading history belongs to.
     */
    public function chapter(): BelongsTo
    {
        return $this->belongsTo(Chapter::class);
    }
}